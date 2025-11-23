"use client"

import { useState } from "react";

export function useModal() {
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return {
    modal,
    handleOpenModal,
    handleCloseModal,
  };
}