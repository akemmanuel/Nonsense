import * as http from "http";
import * as url from "url";

/* =======================
 * ENUMS
 * ======================= */
enum TaskState {
    UNINITIALIZED = 0,
    CREATED = 1,
    COMPLETED = 2,
    DELETED = 3
}

enum TaskTransition {
    CREATE = 0,
    COMPLETE = 1,
    DELETE = 2
}

enum HttpMethod {
    GET = 0,
    POST = 1,
    UNKNOWN = 255
}

/* =======================
 * STRING WRAPPER
 * ======================= */
interface CString {
    buffer: string;
}

function cstring_init(): CString {
    return { buffer: "" };
}

function cstring_assign(s: CString, value: string): void {
    s.buffer = value;
}

function cstring_length(s: CString): number {
    return s.buffer.length;
}

function cstring_c_str(s: CString): string {
    return s.buffer;
}

/* =======================
 * TASK STRUCT
 * ======================= */
interface Task {
    id: number;
    title: CString;
    state: TaskState;
}

function task_init(id: number, title: string): Task {
    return { id, title: cstring_assign(cstring_init(), title) || { buffer: title }, state: TaskState.CREATED };
}

function task_transition(t: Task, transition: TaskTransition): void {
    if (t.state === TaskState.UNINITIALIZED && transition === TaskTransition.CREATE) {
        t.state = TaskState.CREATED;
    } else if (t.state === TaskState.CREATED && transition === TaskTransition.COMPLETE) {
        t.state = TaskState.COMPLETED;
    } else if (transition === TaskTransition.DELETE) {
        t.state = TaskState.DELETED;
    }
}

/* =======================
 * TASK ALLOCATOR
 * ======================= */
interface TaskAllocator {
    pool: Array<Task | null>;
    capacity: number;
}

function task_allocator_init(capacity: number): TaskAllocator {
    return { pool: new Array<Task | null>(capacity).fill(null), capacity };
}

function task_allocate(alloc: TaskAllocator): Task | null {
    for (let i = 0; i < alloc.capacity; i++) {
        if (alloc.pool[i] === null) {
            const t: Task = { id: -1, title: cstring_init(), state: TaskState.UNINITIALIZED };
            alloc.pool[i] = t;
            return t;
        }
    }
    return null;
}

function task_free(alloc: TaskAllocator, task: Task): void {
    for (let i = 0; i < alloc.capacity; i++) {
        if (alloc.pool[i] === task) {
            alloc.pool[i] = null;
            return;
        }
    }
}

/* =======================
 * REPOSITORY
 * ======================= */
interface TaskRepository {
    tasks: Array<Task | null>;
    count: number;
    capacity: number;
}

function repo_init(capacity: number): TaskRepository {
    return { tasks: new Array<Task | null>(capacity).fill(null), count: 0, capacity };
}

function repo_add(repo: TaskRepository, task: Task): boolean {
    if (repo.count >= repo.capacity) return false;
    repo.tasks[repo.count] = task;
    repo.count++;
    return true;
}

function repo_serialize(repo: TaskRepository): string {
    let out = "[";
    for (let i = 0; i < repo.count; i++) {
        const t = repo.tasks[i];
        if (t) {
            out += `{ "id": ${t.id}, "title": "${cstring_c_str(t.title)}", "state": ${t.state} }`;
            if (i < repo.count - 1) out += ",";
        }
    }
    out += "]";
    return out;
}

/* =======================
 * HTTP UTILS
 * ======================= */
function parseHttpMethod(method: string | undefined): HttpMethod {
    if (method === "GET") return HttpMethod.GET;
    if (method === "POST") return HttpMethod.POST;
    return HttpMethod.UNKNOWN;
}

/* =======================
 * SERVER CONTEXT
 * ======================= */
const allocator = task_allocator_init(1024);
const repository = repo_init(1024);
let nextId = 0;

function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const parsedUrl = url.parse(req.url || "", true);
    const method = parseHttpMethod(req.method);

    if (method === HttpMethod.POST && parsedUrl.pathname === "/task") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const t = task_allocate(allocator);
            if (!t) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("OUT_OF_MEMORY\n");
                return;
            }

            t.id = nextId;
            cstring_assign(t.title, body || "UNTITLED_TASK");
            t.state = TaskState.CREATED;

            repo_add(repository, t);
            nextId++;

            res.writeHead(201, { "Content-Type": "text/plain" });
            res.end("TASK_CREATED\n");
        });

        return;
    }

    if (method === HttpMethod.GET && parsedUrl.pathname === "/task") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(repo_serialize(repository));
        return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("NOT_FOUND\n");
}

/* =======================
 * BOOTSTRAP
 * ======================= */
const server = http.createServer(handleRequest);
server.listen(8080, () => {
    console.log("Task Server running on http://localhost:8080");
});
