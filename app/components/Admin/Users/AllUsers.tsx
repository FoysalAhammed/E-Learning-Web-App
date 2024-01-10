import React, { FC,useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Leader/Loader";
import { format } from "timeago.js";
import { useDeletUserMutation, useGetAllUserQuery } from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import toast from "react-hot-toast";
   
type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, error, data,refetch } = useGetAllUserQuery({}, { refetchOnMountOrArgChange: true });
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false);

  const [userId, setUserId] = useState("");

  const [deletUser, { isSuccess, error:deleteError }] = useDeletUserMutation({});

  useEffect(() => {
   if(isSuccess){
    refetch()
    toast.success("user delted successfull")
    setOpen(false)
   }
   if (deleteError) {
    if ("data" in deleteError) {
       const errorMesage = deleteError as any;
       toast.error(errorMesage.data.message);
    }
    
   }
  }, [isSuccess,deletUser,deleteError])

  const handleDelete = async () => {
    const id = userId;
    await deletUser(id);
  };

  
  const colums = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button 
             onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data?.users?.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item?.email,
          role: item?.role,
          courses: item?.courses?.length,
          created_at: format(item?.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item?.email,
          role: item?.role,
          courses: item?.courses?.length,
          created_at: format(item?.createdAt),
        });
      });
  }
  return (
    <div className="">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[220px]  cursor-pointer !rounded[10px] dark:bg-[#57c7a3] dark:border dark:border-[#fff] `}
            onClick={() => setActive(!active) }
            >
              Add New Member
            </div>
            
          </div>
          <Box
            m="20px 0 0 0 "
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .csss-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },

              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0 ",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarCOntainer .MuiButton-text": {
                color: "#fff !improtant",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={colums} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  w-[450px]   bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title} `}>
                  {" "}
                  Are You Sure Want To Delet This user?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 ">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px]  cursor-pointer dark:bg-[#5bfca3] dark:border dark:border-[#fff]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px]  cursor-pointer dark:bg-[#d65a51] dark:border dark:border-[#fff]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
