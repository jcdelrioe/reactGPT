import { useState } from "react"
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  Typingloader,
} from "../../components"

interface Message {
  text: string
  isGpt: Boolean
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    //TODO: UseCase

    setIsLoading(false)

    //TODO: Añadir el mensaje de isGpt en true
  }
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Hola JCDRE" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="Esto es de OpenAi" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <Typingloader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Tu mensaje aqui"
        disableCorrections
      />
    </div>
  )
}
