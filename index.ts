import express, {Express} from "express";
import { JsonRpcProvider, Contract, Wallet } from 'ethers';
import dotenv from 'dotenv';
import { ADDRESS, ABI } from './Contract';

dotenv.config();

const PORT = 4000;
const server: Express = express();

let contract: Contract;

(async ()=>{

    const provider = new JsonRpcProvider('https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7');
    const wallet = new Wallet(process.env.WALLET_PRIV_KEY as string, provider);

    contract = new Contract(ADDRESS, ABI, wallet);

    await contract.on("Get", async (url, headers, onsuccess, onerror) => {
        console.log(`Get`, url, headers, onsuccess, onerror);

        try{
            await handleGet(url,headers,onsuccess,onerror);
        }catch (err){
            console.log(err);
        }
    });
    await contract.on("Post", (url, headers, onsuccess, onerror) => {
        console.log(`Post`, url, headers, onsuccess, onerror);
    });
   

})();

const handleGet = async (url: string, headers: string, onsuccess: string, onerror:string): Promise<any> =>
{
    return new Promise<void>(async (resolve, reject)=>{

        const resp = await fetch(url, {
            method: 'GET',
            headers: JSON.parse(headers)
        });

        if (resp.status !== 200){
            await contract[onsuccess]("Something happend!");
            reject();
        }

        const text = await resp.text();

        let result = await contract[onsuccess](text);
        console.log("Result", result);

        resolve();

    });
}

server.use(express.static("public"));

server.listen( PORT, () => console.log(`Listening on port: ${PORT}`) );