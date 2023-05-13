import { Box, Modal, styled, Typography } from "@mui/material";

const StyledModal = styled(Modal)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "650px",
  height: "400px",
});

type GenericModalProps = {
  header: string;
  open: boolean;
  close: () => void;
  children: JSX.Element;
};

const GenericModal = ({ header, open, close, children }: GenericModalProps) => {
  return (
    <>
      <StyledModal
        open={open}
        onClose={() => close()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={700}
          height={450}
          bgcolor={"#242424"}
          p={5}
          borderRadius={10}
        >
          <Typography variant="button" display="block" textAlign="center">
            {header}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            marginBottom="20px"
            marginTop="20px"
          >
            {children}
          </Box>
        </Box>
      </StyledModal>
    </>
  );
};

export default GenericModal;
