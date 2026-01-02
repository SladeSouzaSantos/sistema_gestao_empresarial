import { useTheme } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Card, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { GroupDetail } from "src/models/Group";
import { useAuth } from "src/utils/auth";
import { useRequests } from "src/utils/requests";

type Props = {
  groupsList: GroupDetail[];
  refreshList: () => void;
};

const GroupsTable = ({groupsList, refreshList} : Props) => {
  const navigate = useNavigate();
  
  const {handlePermissionExists} = useAuth();

  const {deleteGroup} = useRequests();

  const theme = useTheme();

  const handleEditGroup = (groupId: number) => {
    navigate(`/groups/edit/${groupId}`);
  }

  const handleDeleteGroup = async (groupId: number) => {
    await deleteGroup(groupId);
    
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
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupsList.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <Typography 
                    fontWeight='bold'
                    gutterBottom
                  >
                    #{group.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                    fontWeight='bold'
                    gutterBottom
                  >
                    {group.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {handlePermissionExists('change_group') &&
                    <Tooltip title="Editar cargo" arrow>
                      <IconButton
                        sx={{ 
                          '&:hover': { 
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon onClick={() => handleEditGroup(group.id)} />                     
                      </IconButton>
                    </Tooltip>
                  }
                  {handlePermissionExists('delete_group') &&
                    <Tooltip title="Excluir cargo" arrow>
                      <IconButton
                        sx={{ 
                          '&:hover': { 
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon onClick={() => handleDeleteGroup(group.id)} />                     
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

export default GroupsTable;