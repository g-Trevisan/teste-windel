import { Box, Typography, Button, Modal } from "@mui/material";

export const ModalConfirmDelete = ({
  open,
  handleClose,
  handleDelete,
  name,
  multipleDelete
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Confirmar Exclusão</Typography>
        <Typography sx={{ mt: 2 }}>
          {multipleDelete
            ? `Você tem certeza que deseja excluir as receitas selecionadas?`
            : `Você tem certeza que deseja excluir a receita "${name}"?`
          }
          
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Excluir
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
