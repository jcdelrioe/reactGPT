import { useEffect, useState } from "react"
import {
  GptMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components/index"
import {
  createThreadUseCase,
  postQuestionUseCase,
} from "../../../core/use-cases"

interface Message {
  text: string
  isGpt: Boolean
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreadId] = useState<string>()

  //Obtener el thread o crearlo si no existe
  useEffect(() => {
    const threadId = localStorage.getItem("threadId")
    if (threadId) {
      setThreadId(threadId)
    } else {
      createThreadUseCase().then((id) => {
        setThreadId(id)
        localStorage.setItem("threadId", id)
      })
    }
  }, [])

  // useEffect(() => {
  //   if (threadId) {
  //     setMessages((prev) => [
  //       ...prev,
  //       { text: `ThreadId: ${threadId}`, isGpt: true },
  //     ])
  //   }
  // }, [threadId])

  const handlePost = async (text: string) => {
    if (!threadId) return

    setIsLoading(true)
    setMessages((prev) => [...prev, { text: text, isGpt: false }])

    // UseCase
    const replies = await postQuestionUseCase(threadId, text)

    setIsLoading(false)

    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages((prev) => [
          ...prev,
          { text: message, isGpt: reply.role === "assistant", info: reply },
        ])
      }
    }
  }
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Buen día, soy Sam, en qué puedo ayudarte?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
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
