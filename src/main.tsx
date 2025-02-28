import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ReactGPT } from "./ReactGPT.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactGPT />
  </StrictMode>
)
