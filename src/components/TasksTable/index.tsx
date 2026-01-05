import { Card, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Task } from "src/models/Task";
import { useDate } from "src/utils/formatDate";

type Props = {
  tasksList: Task[];
  refreshList: () => void;
}

const TasksTable = ({tasksList, refreshList} : Props) => {
    const {handlePermissionExists} = useAuth();
    const {deleteTask} = useRequests();
    const {formatIsoUtcToBr} = useDate();

    const navigate = useNavigate();

    const handleEditTask = (TaskId: number) => {
        navigate(`/tasks/edit/${TaskId}`);
    }

    const handleDeleteTask = async (TaskId: number) => {
        await deleteTask(TaskId);
        
        refreshList();
    }

    return (
        <Container>
            <Card>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Prazo</TableCell>
                    <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasksList.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                #{task.id}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                {task.title}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                {task.status}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                {task.due_date ? formatIsoUtcToBr(task.due_date) : 'Sem prazo'}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                        {handlePermissionExists('change_task') &&
                            <Tooltip title="Editar tarefa" arrow>
                            <IconButton
                                color="primary"
                                size="small"
                            >
                                <EditTwoToneIcon onClick={() => handleEditTask(task.id)} />                    
                            </IconButton>
                            </Tooltip>
                        }
                        {handlePermissionExists('delete_task') &&
                            <Tooltip title="Excluir tarefa" arrow>
                            <IconButton
                                color="error"
                                size="small"
                            >
                                <DeleteTwoToneIcon onClick={() => handleDeleteTask(task.id)} />                     
                            </IconButton>
                            </Tooltip>
                        }
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Card>
        </Container>
    );
}

export default TasksTable;