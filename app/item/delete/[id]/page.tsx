"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import useAuth from "@app/utils/useAuth";
import process from "process";

const DeleteItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const loginUserEmail = useAuth();

  useEffect(() => {
    const getItem = async (id) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/read/${id}`,
        {cache: "no-store"}
      );
      const jsonData = await response.json();
      const item = jsonData.item;
      setTitle(item.title);
      setPrice(item.price);
      setImage(item.image);
      setDescription(item.description);
      setEmail(item.email);
    };
    getItem(context.params.id);
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: loginUserEmail
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      alert("Failed to delete the item.");
    }
  };

  if (loginUserEmail === email) {
    return (
      <div>
        <h1 className="page-title">Delete the item</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <Image src={image} width={750} height={500} alt="item-image" priority/>
          <h3>¥{price}</h3>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;