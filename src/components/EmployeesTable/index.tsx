import { Card, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Employee } from "src/models/Employee";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

type Props = {
  employeesList: Employee[];
  refreshList: () => void;
}

const EmployeesTable = ({employeesList, refreshList} : Props) => {
    const {handlePermissionExists} = useAuth();
    const {deleteEmployee} = useRequests();

    const navigate = useNavigate();

    const handleEditEmployee = (employeeId: number) => {
        navigate(`/employees/edit/${employeeId}`);
    }

    const handleDeleteEmployee = async (employeeId: number) => {
        await deleteEmployee(employeeId);
        
        refreshList();
    }

    return (
        <Container>
            <Card>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell align="right">Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employeesList.map((employee) => (
                    <TableRow key={employee.id}>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                #{employee.id}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                {employee.name}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography 
                                fontWeight='bold'
                                gutterBottom
                            >
                                {employee.email}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                        {handlePermissionExists('change_employee') &&
                            <Tooltip title="Editar funcionário" arrow>
                            <IconButton
                                color="primary"
                                size="small"
                            >
                                <EditTwoToneIcon onClick={() => handleEditEmployee(employee.id)} />                     
                            </IconButton>
                            </Tooltip>
                        }
                        {handlePermissionExists('delete_employee') &&
                            <Tooltip title="Excluir funcionário" arrow>
                            <IconButton
                                color="error"
                                size="small"
                            >
                                <DeleteTwoToneIcon onClick={() => handleDeleteEmployee(employee.id)} />                     
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

export default EmployeesTable;