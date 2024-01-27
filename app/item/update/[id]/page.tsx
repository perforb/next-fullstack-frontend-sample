"use client";

import {useEffect, useState} from "react";
import useAuth from "@app/utils/useAuth";

const UpdateItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const loginUserEmail = useAuth();

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
      const response = await fetch(`http://localhost:3000/api/item/update/${context.params.id}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserEmail
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      alert("Failed to update an item.");
    }
  };

  if (loginUserEmail === email) {
    return (
      <div>
        <h1>Update the item</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}
                 placeholder="アイテム名" required/>
          <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="価格"
                 required/>
          <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="画像"
                 required/>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="商品説明" required></textarea>
          <button>編集</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default UpdateItem;