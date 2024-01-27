import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {jwtVerify} from "jose";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token: string = localStorage.getItem("token") || "";
        if (!token) {
          router.push("/user/login");
        }
        // TODO fix later
        const secretKey = new TextEncoder().encode("Lkm9kDsCEtokUDPU");
        console.log(secretKey);
        const decodedJwt = await jwtVerify(token, secretKey);
        const email = decodedJwt.payload.email as string;
        setLoginUserEmail(email);
      } catch (e) {
        router.push("/user/login");
      }
    };
    checkToken();
  }, [router]);

  return loginUserEmail;
};

export default useAuth;
