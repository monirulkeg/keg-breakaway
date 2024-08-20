import client from "@/client";
import { Product } from "@/types/product";
import React, { FC, useEffect, useState } from "react";

interface IProps {
  children: JSX.Element;
}

const Column = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-solid border-2 border-slate-600">{children}</div>
  );
};

export default Column;
