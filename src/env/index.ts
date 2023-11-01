import { z } from "zod";


const envSchema = z.object({
    EXPO_PUBLIC_API_CONSOLE_GOOGLE_WEB_CLIENT_ID: z.string(),
    EXPO_PUBLIC_API_CONSOLE_GOOGLE_ANDROID_ID: z.string(),
    EXPO_PUBLIC_API_CONSOLE_GOOGLE_IOS_ID: z.string(),
    EXPO_PUBLIC_REALM_APP_ID: z.string()
})

const _env = envSchema.parse(process.env);

if(!_env) {
    throw new Error("Env don`t load.")
}

export const env = _env;