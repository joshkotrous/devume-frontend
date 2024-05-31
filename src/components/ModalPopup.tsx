import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { motion } from "framer-motion";
interface ModalPopupProps {
  deleteFunction: () => void;
  cancelFunction: () => void;
  message: string;
  deleteText: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  deleteFunction,
  cancelFunction,
  deleteText,
  message,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed w-screen h-screen z-[60] flex justify-center items-center top-0 left-0 bg-black/50"
    >
      <Card className="w-1/3 h-1/4 flex text-center justify-center items-center">
        <CardBody className="w-1/2 flex items-center justify-center text-center gap-4">
          {message}
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer"
              onClick={() => {
                cancelFunction();
              }}
            >
              Cancel
            </div>
            <Button
              className="bg-red-700/50 text-red-600"
              onClick={() => {
                deleteFunction();
              }}
            >
              {deleteText}
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ModalPopup;
