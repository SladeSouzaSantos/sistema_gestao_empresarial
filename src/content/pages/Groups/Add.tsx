import { Button, Container, LinearProgress, Snackbar, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PermissionsList from "src/components/PermissionsList";
import { PermissionMiddleware } from "src/middlewares/PermissionMiddleware";
import { PermissionDetail } from "src/models/Permission";
import { useRequests } from "src/utils/requests";

const AddGroup = () => {
    const navigate = useNavigate();

    const [requestLoading, setRequestLoading] = useState(true);

    const [infoMessage, setInfoMessage] = useState("");

    const [nameInput, setNameInput] = useState("");

    const [permissionsData, setPermissionsData] = useState<PermissionDetail[]>([]);
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    const {getPermissions, addGroup} = useRequests();

    const handleGetPermissions = async () => {
        const response = await getPermissions();
        
        if (!response.detail) {
            setPermissionsData(response.data.permissions);
        }
    }

    const handleAdd = async () => {
        const name = nameInput;
        const permissions = selectedPermissions.join(",");

        if (!name) {
            setInfoMessage("Por favor, preencha o nome do cargo.");
            return;
        }

        setRequestLoading(true);
        const response = await addGroup({name, permissions});
        setRequestLoading(false);

        if (response.detail) {
            setInfoMessage(response.detail);
        }else{
            navigate("/groups");
        }
    }

    useEffect(() => {
        Promise.resolve(handleGetPermissions()).finally(() => {
            setRequestLoading(false);
        });
    }, []);

    return (
        <PermissionMiddleware codeName="add_usergroup">
            <Helmet>
                <title>Adicionar Cargo | Sistema de Gestão Empresarial</title>                
            </Helmet>
            {requestLoading && <LinearProgress sx={{
                height: 2
            }} color="primary" />}

            <PageTitleWrapper>
                <PageTitle
                     heading="Adicionar um Cargo"
                     subHeading="Adicione um cargo e defina suas respectivas permissões"
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
                        label="Nome do Cargo *"
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
                        onClick={requestLoading ? () => null : handleAdd}
                        disabled={requestLoading}
                    >
                        Adicionar
                    </Button>
                </Stack>
            </Container>
        </PermissionMiddleware>
    );    
};

export default AddGroup;