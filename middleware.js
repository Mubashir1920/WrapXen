import { createClient, OAuthStrategy } from "@wix/sdk";
import { NextResponse } from "next/server"


export const middleware = async (request)=>{

    const cookies = request.cookies
    const res = NextResponse.next()

    if(cookies.get('refreshToken')){
        return res;
    }

    const wixClient = createClient({
        auth:OAuthStrategy({clientId:process.env.NEXT_PUBLIC_WIX_CLIENT_ID})
    })

    const tokens = await wixClient.auth.generateVisitorTokens()
    res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken),{
        maxAge:60*60*30*24
    })

    return res;
}