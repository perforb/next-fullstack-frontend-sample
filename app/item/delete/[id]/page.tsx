"use client";

import {useEffect, useState} from "react";
import Image from "next/image";

const DeleteItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getItem = async (id) => {
      const response = await fetch(
        `http://localhost:3000/api/item/read/${id}`,
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
      const response = await fetch(`http://localhost:3000/api/item/delete/${context.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: "dummy"
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      alert("Failed to delete the item.");
    }
  };

  return (
    <div>
      <h1>Delete the item</h1>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <Image src={image} width={750} height={500} alt="item-image" priority/>
        <h3>¥{price}</h3>
        <p>{description}</p>
        <button>削除</button>
      </form>
    </div>
  );
};

export default DeleteItem;