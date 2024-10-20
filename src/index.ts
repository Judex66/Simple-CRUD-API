import dotenv from 'dotenv';
import { env } from 'node:process';
import Users from './interface/Users';
import http, { IncomingMessage, ServerResponse } from 'node:http';
dotenv.config();

function serverCreate(
    port= Number(env.PORT || 4000),
    users: Users[] = []
  ): void {
    const server = http.createServer(
      
      async (req: IncomingMessage, res: ServerResponse) => {
        
        try {
          const { method, url } = req;
          if (typeof url !== 'string') {
            return;
          }
          switch (method) {
            case 'GET':
              Get(url, res, users);
              break;
            case 'POST':
              await Post(url, req, res, users);
              break;
            case 'PUT':
              await Put(url, req, res, users);
              break;
            case 'DELETE':
              Delete(url, res, users);
              break;
            default:
              console.log(res)
          }
        } catch(res) {
console.log(res)
        }
      },
    );
  
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
  serverCreate()