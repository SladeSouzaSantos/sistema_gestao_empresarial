import { ApiGetUser, ApiSignIn } from "src/models/Auth";
import { useApi } from "./api";
import { ApiGetPermissions } from "src/models/Permission";
import { ApiGetGroup, ApiGetGroups } from "src/models/Group";
import { ApiGetEmployee, ApiGetEmployees } from "src/models/Employee";
import { ApiGetTask, ApiGetTasks } from "src/models/Task";

const signIn = async ({ email, password }: { email: string; password: string }) => {
    const response = await useApi<ApiSignIn>('auth/signin', 'POST', { email, password }, false);
    return response;
}

const getUser = async () => {
    const response = await useApi<ApiGetUser>('auth/user');
    return response;
}

const getPermissions = async () => {
    const response = await useApi<ApiGetPermissions>('companies/permissions');
    return response;
}

const getGroups = async () => {
    const response = await useApi<ApiGetGroups>('companies/groups');
    return response;
}

const getAnGroup = async (groupId: number) => {
    const response = await useApi<ApiGetGroup>(`companies/groups/${groupId}`);
    return response;
}

const addGroup = async ({name, permissions}: { name: string; permissions: string }) => {
    const response = await useApi<ApiGetGroup>('companies/groups', 'POST', { name, permissions });
    return response;
}

const editGroup = async (groupId: number, {name, permissions}: { name?: string; permissions?: string }) => {
    const response = await useApi(`companies/groups/${groupId}`, 'PUT', { name, permissions });
    return response;
}

const deleteGroup = async (groupId: number) => {
    const response = await useApi(`companies/groups/${groupId}`, 'DELETE');
    return response;
}

const getEmployees = async () => {
    const response = await useApi<ApiGetEmployees>('companies/employees');
    return response;
}

const getAnEmployee = async (employeeId: number) => {
    const response = await useApi<ApiGetEmployee>(`companies/employees/${employeeId}`);
    return response;
}

const addEmployee = async ({name, email, password}: { name: string; email: string; password: string }) => {
    const response = await useApi<ApiGetEmployee>('companies/employees', 'POST', { name, email, password });
    return response;
}

const editEmployee = async (employeeId: number, {name, email, groups}: { name?: string; email?: string; groups?: string }) => {
    const response = await useApi(`companies/employees/${employeeId}`, 'PUT', { name, email, groups });
    return response;
}

const deleteEmployee = async (employeeId: number) => {
    const response = await useApi(`companies/employees/${employeeId}`, 'DELETE');
    return response;
}

const getTasks = async () => {
    const response = await useApi<ApiGetTasks>('companies/tasks');
    return response;
}

const getAnTask = async (taskId: number) => {
    const response = await useApi<ApiGetTask>(`companies/tasks/${taskId}`);
    return response;
}

const addTask = async (
    {title, description, due_date, employee_id, status_id}: 
    { title: string; description?: string; due_date?: string; employee_id: number; status_id: number }
) => {
    const response = await useApi<ApiGetTask>('companies/tasks', 'POST', { title, description, due_date, employee_id, status_id });
    return response;
}

const editTask = async (
    taskId: number, {title, description, due_date, employee_id, status_id}: 
    { title?: string; description?: string; due_date?: string; employee_id?: number; status_id?: number }
) => {
    const response = await useApi<ApiGetTask>(`companies/tasks/${taskId}`, 'PUT', { title, description, due_date, employee_id, status_id });
    return response;
}

const deleteTask = async (taskId: number) => {
    const response = await useApi(`companies/tasks/${taskId}`, 'DELETE');
    return response;
}

export const useRequests = () => ({
    signIn,
    getUser,
    getPermissions,
    getGroups,
    getAnGroup,
    addGroup,
    editGroup,
    deleteGroup,
    getEmployees,
    getAnEmployee,
    addEmployee,
    editEmployee,
    deleteEmployee,
    getTasks,
    getAnTask,
    addTask,
    editTask,
    deleteTask
});