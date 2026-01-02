import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PermissionsList from "src/components/PermissionsList";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { PermissionDetail } from "src/models/Permission";
import { useRequests } from "src/utils/requests";

const EditGroup = () => {
    const navigate = useNavigate();

    const [requestLoading, setRequestLoading] = useState(true);

    const [infoMessage, setInfoMessage] = useState("");

    const [nameInput, setNameInput] = useState("");

    const [permissionsData, setPermissionsData] = useState<PermissionDetail[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    const {id: group_id} = useParams();

    const {getPermissions, getAnGroup, editGroup} = useRequests();

    const handleGetPermissions = async () => {
        const response = await getPermissions();
        
        if (!response.detail) {
            setPermissionsData(response.data.permissions);
        }
    }

    const handleGetGroup = async () => {
        const response = await getAnGroup(Number(group_id));
        if (!response.detail) {
            setNameInput(response.data.group.name);
            const permissionIds = response.data.group.permissions.map((permission) => permission.id);
            setSelectedPermissions(permissionIds);
        }
    }

    const handleEdit = async () => {
        const name = nameInput;
        const permissions = selectedPermissions.join(",");

        if (!name) {
            setInfoMessage("Por favor, preencha o nome do cargo.");
            return;
        }

        setRequestLoading(true);
        const response = await editGroup(Number(group_id), {name, permissions});
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail);
        }else{
            navigate("/groups");
        }
    }

    useEffect(() => {
        Promise.resolve([handleGetPermissions(), handleGetGroup()]).finally(() => {
            setRequestLoading(false);
        });
    }, []);

    return (
        <PermissionMiddleware codeName="change_group">
            <Helmet>
                <title>Editar Cargo | Sistema de Gestão Empresarial</title>                
            </Helmet>
            {requestLoading && <LinearProgress sx={{
                height: 2
            }} color="primary" />}

            <PageTitleWrapper>
                <PageTitle
                     heading="Editar um Cargo"
                     subHeading="Editar um cargo e suas respectivas permissões"
                />
            </PageTitleWrapper>

            <Snackbar
                open={infoMessage != ""}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                onClose={() => setInfoMessage("")}
                message={infoMessage}
            />

            <Container maxWidth="lg">
                <Stack maxWidth={700} spacing={3}>
                    <TextField
                        label="Nome do Cargo"
                        fullWidth
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    <PermissionsList 
                        permissionsData={permissionsData}
                        selectedPermissions={selectedPermissions}
                        setSelectedPermissions={setSelectedPermissions}
                    />

                    <Button
                        variant="outlined"
                        sx={{width: 90, mt: 3}}
                        onClick={requestLoading ? () => null : handleEdit}
                        disabled={requestLoading}
                    >
                        Editar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    );    
};

export default EditGroup;