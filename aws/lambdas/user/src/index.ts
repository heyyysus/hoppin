import { APIGatewayProxyCallback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Pool } from 'pg';
import { APIEvent, Context } from './types';
import { createWithAutoUsername, fetchOneBy, getUserPlans, patchUser } from './user.service';

const pool = new Pool({
    host: "group-study-ucsb-dev.c8nxscgmv2nn.us-west-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "RPloa9Wa04gkcmtHFwWFl",
});

const cors = (a: any, origin: string) => {
    return {
        ... a,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Headers': "Authorization",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
            "Access-Control-Max-Age": "300",

        },
    };
}



const getAuthorizedUser = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
        
        const user_id = event.requestContext.authorizer.jwt.claims.sub;
    
        const query = "SELECT * FROM users WHERE user_id=$1 LIMIT 1";
        const result = await pool.query(query, [ user_id ]);
    
        let user = (result.rowCount > 0) ? result.rows[0] : null;

        if(!user){ 
            user = await createWithAutoUsername(user_id);
         }

        return {
            statusCode: 200,
            body: JSON.stringify(user),
        }

    } catch (error) {
        const body = { error: error }
        return {
            statusCode: 500,
            body: JSON.stringify(body),
        }
    }
}

const user_handler = async (event: APIEvent, context: Context) => {
    const claims = event.requestContext.authorizer?.jwt?.claims;
    
    switch(event.requestContext.http.method){
        case "GET":
            const username = event.queryStringParameters?.username || undefined;
            const user_id = event.queryStringParameters?.user_id || undefined;
            if(username)
                return {
                    statusCode: 200,
                    body: JSON.stringify(await fetchOneBy('username', username)),
                    //body: username
                }
            else if(user_id) 
                return {
                    statusCode: 200,
                    body: JSON.stringify(await fetchOneBy('user_id', user_id)),
                };
            else
                return await getAuthorizedUser(event, context);
        
        case "PATCH":
            const user = JSON.parse(event.body);
            if(user && user.user_id && user.username){
                if(user.user_id === claims.sub)
                    return {
                        statusCode: 200,
                        body: JSON.stringify(await patchUser(user)),
                    };
                else 
                    return {
                        statusCode: 403,
                        body: "Forbidden"
                    };
            } else 
                return {
                    statusCode: 400,
                    body: "user_id and username required"
                };
        default: 
            return { statusCode: 404, body: "Not found" };
    }
}

const plans_handler = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const claims = event.requestContext.authorizer?.jwt?.claims;
    
    switch(event.requestContext.http.method){
        case "GET":
            const user_id = event.queryStringParameters?.user_id || undefined;
            const userPlans = await getUserPlans(claims.sub);
            return {
                statusCode: 200,
                body: JSON.stringify(userPlans),
            };
    }

}


const prehandler = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {

    const path = event.requestContext.http.path;

    switch(path){
        case "/user":
            return user_handler(event, context);
        case "/plans":
            return plans_handler(event, context);
    }

    

}

export const handler = async (event: APIEvent, context: Context): Promise<APIGatewayProxyResult> => {

    try {
        const allowed_origin = `https://d29ba174zxs5ij.cloudfront.net`;
        if(event.requestContext.http.method === "OPTIONS")
            return cors({
                statusCode: 200,
                body: "",
            }, allowed_origin);
        
        return cors(await prehandler(event, context), allowed_origin);
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error })
        };
    }
}