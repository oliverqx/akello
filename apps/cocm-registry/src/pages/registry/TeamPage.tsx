
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {useAkello} from "@akello/react-hook";



const columns: GridColDef[] = [
    {
        field: 'email',
        headerName: 'email',
        width: 250,
        editable: true,
    },
    {
        field: 'first_name',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'last_name',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
        field: 'role',
        headerName: 'Role',
        type: 'string',
        width: 210,
        editable: true,
    },
    {
        field: 'is_admin',
        headerName: 'Admin',
        type: 'boolean',
        width: 210,
        editable: true,
    },
    {
        field: '',
        renderCell: (cellValues) => {
            return (
                <>
                    {
                        !cellValues.row.is_user && (
                            <div className={"btn btn-error"}
                                 onClick={(event) => {
                                    console.log(event)
                                 }}
                            >
                                Delete
                            </div>
                        )
                    }
                </>

            );
        }
    },
];


const TeamPage = () => {
    const [teamMembers, setTeamMebmers] = useState([])
    const akello = useAkello()

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      
    const lightTheme = createTheme({
      palette: {
        mode: 'light'
      }
    })

    let muiTheme = lightTheme

    const theme = document.querySelector('html')?.getAttribute('data-theme');
    if(theme == 'dark') {
        muiTheme = darkTheme
    }

    useEffect(() => {        
        const selectedRegistry = akello.getSelectedRegistry();
        if (selectedRegistry) {
            akello.registryService.getMembers(selectedRegistry.id, (data) => {
                setTeamMebmers(data)
            })
        }
    }, [])

    


    return (
        <>
        <div className={""}>
                <ThemeProvider theme={muiTheme}>
                <DataGrid
                    getRowId={(row) => row.user_id}
                    onRowClick={() => {}}
                    rows={teamMembers}
                    columns={columns}
                />
                </ThemeProvider>                                
            </div>
        </>
    )
}

export default TeamPage