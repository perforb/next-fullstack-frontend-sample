import Image from "next/image";
import Link from "next/link";

const getItem = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/item/read/${id}`,
    {cache: "no-store"}
  );
  const jsonData = await response.json();
  return jsonData.item;
};

const ReadItem = async (context) => {
  const item = await getItem(context.params.id);
  return (
    <div className="grid-container-si">
      <div>
        <Image src={item.image} width={750} height={500} alt="item-image" priority/>
      </div>
      <div>
        <h1>{item.title}</h1>
        <h2>¥{item.price}</h2>
        <hr/>
        <p>{item.description}</p>
      </div>
      <div>
        <Link href={`/item/update/${item._id}`}>アイテム編集</Link>
        <Link href={`/item/delete/${item._id}`}>アイテム削除</Link>
      </div>
    </div>
  );
};

export default ReadItem;