import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";
import { PermissionDetail } from "src/models/Permission";

type Props = {
  permissionsData: PermissionDetail[];
  selectedPermissions: number[];
  setSelectedPermissions: (value: number[]) => void;
};

const PermissionsList = ({ permissionsData, selectedPermissions, setSelectedPermissions }: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>, permissionId: number) => {
        const { checked } = event.target;

        if (checked) {
            setSelectedPermissions([...selectedPermissions, permissionId]);
        } else {
            setSelectedPermissions(selectedPermissions.filter((id) => id != permissionId));
        }
    }

    return (
        <>
            <FormGroup>
                {permissionsData.map((item) => (
                    <FormControlLabel
                        key={item.id}
                        control={
                            <Checkbox
                                checked={selectedPermissions.includes(item.id)}
                                onChange={(e) => handleChange(e, item.id)}
                            />
                        }
                        label={item.name}
                    />
                ))}
            </FormGroup>
        </>
    )
};

export default PermissionsList;