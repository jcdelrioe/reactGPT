import { translateUseCase } from "../../../../nest-gpt/src/gpt/use-cases/translate.use-case"
import { TranslateResponse } from "../../interfaces"
export const translateTextUseCase = async (prompt: string, lang: string) => {
  try {
    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, lang }),
    })

    if (!resp.ok) throw new Error("No se pudo realizar la traducción")

    const { message } = (await resp.json()) as TranslateResponse

    return {
      ok: true,
      message: message,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "Error al traducir el texto",
    }
  }
}
