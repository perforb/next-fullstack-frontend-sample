import Image from "next/image";
import Link from "next/link";

const getAllItems = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readall`,
    {cache: "no-store"}
  );
  const jsonData = await response.json();
  return jsonData.items;
};

const ReadAllItems = async () => {
  const items = await getAllItems();
  return (
    <div className="grid-container-in">
      {items.map(item =>
        <Link href={`/item/read/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500} alt="item-image" priority/>
          <div key={item._id}>
            <h2>¥{item.price}</h2>
            <h3>{item.title}</h3>
            <p>{item.description.substring(0, 80)}...</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ReadAllItems;