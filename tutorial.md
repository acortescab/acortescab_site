# Tutorial: Building a Portfolio Website with an AI "Digital Twin"

This guide explains, in beginner-friendly language, what was built in this project and why each part exists. It is written to help you understand not just the final result, but the thinking behind it.

By the end of this tutorial, you should understand:

- what Next.js is and why it is useful
- how React components form a webpage
- how a client-side chat feature works
- how a server route can call an external AI API
- how environment variables protect secret keys
- how a portfolio website can be extended with AI functionality

---

## 1. Project summary

This project is a portfolio website for a software engineer and tech lead. It includes:

- a modern landing page with personal branding
- sections for experience, strengths, and career timeline
- a “Digital Twin” chat feature
- a backend API route that talks to OpenRouter
- a configured API key loaded from a local environment file

The main idea is simple: instead of just showing information about a person, the site also lets visitors ask questions in natural language and receive a response grounded in that person’s career history and skills.

---

## 2. Technologies used

Here is the high-level technology stack used in this app.

### Next.js
Next.js is a web framework built on top of React.

It gives you:

- routing for pages and API endpoints
- server-side rendering support
- a clean app structure
- great developer experience for production websites

This app uses the App Router pattern, which means pages and API routes live under the `app/` folder.

### React
React is the library used to build user interfaces.

It lets you define UI as reusable components, like:

- a card
- a section
- a chat box
- a button

React is the foundation behind most modern frontend interfaces.

### TypeScript
TypeScript adds static typing to JavaScript.

This helps with:

- fewer mistakes
- better editor support
- easier refactoring
- clearer code

In this project, TypeScript is used for the component code and server logic.

### Tailwind CSS
Tailwind CSS is a utility-first CSS framework.

Instead of writing large CSS files with lots of custom rules, you write small classes like:

- `bg-slate-900`
- `text-white`
- `rounded-2xl`
- `px-6`

This makes styling faster and more consistent.

### OpenRouter
OpenRouter is an API service that gives you access to LLMs from different providers through a single interface.

This project uses the model:

- `qwen/qwen3.8-27b:free`

The app sends the user’s question to OpenRouter and receives a response. That response is then displayed in the chat UI.

### Environment variables
A `.env` file stores sensitive values like API keys without committing them to source control.

This is important because you should never hardcode secret keys directly into frontend code or public repo files.

---

## 3. High-level architecture

This app has two main layers:

### Frontend layer
The frontend is the visible website. It is about layout, content, and interaction.

This is handled by:

- `app/page.tsx` for the homepage content
- `app/components/digital-twin-chat.tsx` for the chat UI
- `app/globals.css` for global styling

### Backend layer
The backend API handles calls to the AI model.

This is handled by:

- `app/api/chat/route.ts`

This route accepts a user message, adds the system prompt, and sends it to OpenRouter.

So the flow is:

1. user types a question in the browser
2. React sends the message to `/api/chat`
3. the server route reads the message
4. the server sends the message to OpenRouter
5. the model returns a response
6. the browser displays the model answer

---

## 4. Project structure

The project is organized like this:

```text
acortescab_site/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── components/
│   │   └── digital-twin-chat.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .env
├── package.json
├── next.config.ts
├── tsconfig.json
├── tutorial.md
└── public/
```

A beginner-friendly way to read this:

- `app/page.tsx` = the homepage
- `app/components/...` = reusable UI blocks
- `app/api/chat/route.ts` = server API logic
- `.env` = secret environment variables

---

## 5. The homepage walkthrough

Let’s look at the main page file, `app/page.tsx`.

This file contains several arrays of data.

Example:

```tsx
const metrics = [
  { value: "9+", label: "Years building products" },
  { value: "5+", label: "Years technical leadership" },
  { value: "AWS", label: "Cloud and CI/CD expertise" },
  { value: "Unity", label: "Cross-platform game delivery" },
];
```

This pattern is very common in React projects:

- store structured information in a JavaScript array
- map over it to generate repeated UI blocks

Then later in the component, the app does this:

```tsx
{metrics.map((metric) => (
  <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
    <div className="text-3xl font-semibold tracking-[-0.05em] text-white">{metric.value}</div>
    <p className="mt-2 text-sm text-zinc-300">{metric.label}</p>
  </div>
))}
```

This is very important for beginners to understand:

- `map()` loops over an array
- each item becomes one UI element
- `key` helps React stay efficient and stable

### Why this is useful
Instead of writing the same HTML card four times manually, you store data once and render it dynamically.

This is one of the central ideas in modern frontend development.

---

## 6. Why the page uses sections

The homepage is structured with sections like:

- About
- Journey
- Portfolio
- Digital Twin
- Contact

This is a classic landing-page pattern.

Each section is a `section` element with an `id`, such as:

```tsx
<section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
```

The `id` allows in-page navigation using links like:

```tsx
<a href="#about">About</a>
```

This is how the navbar scrolls to the correct section when clicked.

---

## 7. The Digital Twin chat component

The chat UI is in `app/components/digital-twin-chat.tsx`.

This is a React client component because it needs to interact with the browser and user input.

The first line is:

```tsx
"use client";
```

This signal tells Next.js that this component can run in the browser and use state.

### State in React
The component stores the conversation messages and the current input text using `useState`.

```tsx
const [messages, setMessages] = useState<Message[]>([
  {
    role: "assistant",
    content:
      "Hi, I’m Alejandro’s Digital Twin. Ask me about his career, leadership style, technical background, or the projects he has led.",
  },
]);
const [input, setInput] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

This is the heart of the chat:

- `messages` stores the conversation history
- `input` stores what the user is currently typing
- `isLoading` tells the UI to show a loading state while waiting for the AI

### Handling form submit
When the form is submitted, the app reads the input and sends it to the server route.

```tsx
async function handleSubmit(event: FormEvent) {
  event.preventDefault();

  const trimmed = input.trim();
  if (!trimmed || isLoading) {
    return;
  }

  const nextUserMessage: Message = { role: "user", content: trimmed };
  setMessages((current) => [...current, nextUserMessage]);
  setInput("");
  setIsLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: trimmed }),
    });
```

This is the beginner version of a frontend-to-backend request.

### Why `fetch` matters here
The `fetch()` function sends an HTTP request to the server. In this case, it sends JSON:

```tsx
body: JSON.stringify({ message: trimmed })
```

That means the server receives the user input and can run logic with it.

---

## 8. The AI route: backend logic

The heart of the AI integration is in `app/api/chat/route.ts`.

This file handles a `POST` request to `/api/chat`.

### Step 1: Validate the incoming message

```ts
const body = await request.json().catch(() => null);
const message = typeof body?.message === "string" ? body.message.trim() : "";

if (!message) {
  return NextResponse.json(
    { error: "A message is required." },
    { status: 400 },
  );
}
```

This prevents empty requests and helps the server fail gracefully if the client sends invalid data.

### Step 2: Read the secret key

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  return NextResponse.json(
    { error: "OpenRouter API key is not configured." },
    { status: 500 },
  );
}
```

This is a very important security pattern.

The API key should never be stored in client-side code. It lives in `.env` and is read only by the server.

### Step 3: Send a request to OpenRouter

```ts
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://acortescab.site",
    "X-Title": "Alejandro Cortes Cabrejas Digital Twin",
  },
  body: JSON.stringify({
    model: "qwen/qwen3.8-27b:free",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 700,
  }),
});
```

This is the key idea behind the AI feature:

- send the user message
- create a system prompt that defines the persona
- let the model answer as if it were a digital twin of the person

### Step 4: parse the result

```ts
const data = await response.json();

if (response.ok) {
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply || typeof reply !== "string") {
    return NextResponse.json(
      { error: "No response received from OpenRouter." },
      { status: 500 },
    );
  }

  return NextResponse.json({ reply });
}
```

This reads the reply from the API result and sends it back to the frontend as JSON.

---

## 9. Why the system prompt matters

The system prompt is one of the most important parts of this project.

```ts
const systemPrompt = `You are the Digital Twin of Alejandro Cortes Cabrejas, a tech lead and software engineer based in Barcelona.

Use only the following profile information to answer questions. Keep responses concise, professional, and grounded in his actual background.
...
`;
```

This tells the AI:

- who the person is
- what facts are allowed
- what tone to use
- what not to invent

This is how the site avoids generic AI answers and keeps responses aligned with the real person’s background.

A system prompt is basically “the AI’s role and rules.”

---

## 10. The role of the `.env` file

This project includes a `.env` file in the root:

```env
OPENROUTER_API_KEY=your_key_here
```

This is important because:

- keys should stay out of the codebase
- keys should not be visible to users in the browser
- the server can access those values securely

In Next.js, files like `.env` are read during the server runtime, which makes them suitable for API keys and other secrets.

---

## 11. Detailed code review with examples

Now let’s walk through the most important files one by one.

### File 1: `app/page.tsx`

This is the homepage. It is mostly a single component called `Home`.

The first section of the file defines arrays of data:

```tsx
const metrics = [
  { value: "9+", label: "Years building products" },
  { value: "5+", label: "Years technical leadership" },
  { value: "AWS", label: "Cloud and CI/CD expertise" },
  { value: "Unity", label: "Cross-platform game delivery" },
];
```

This is a common React pattern because the information is structured, readable, and reusable.

Then the component returns JSX:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070b12] text-zinc-100">
```

The HTML-like structure is actually JSX. It looks like HTML but is JavaScript.

This is a very beginner-friendly concept to learn:

- JSX lets you write UI in a syntax that resembles HTML
- you can embed JavaScript expressions in curly braces
- you can pass class names and inline styles as props

Example:

```tsx
<h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-white">
  Building product momentum with technical clarity.
</h1>
```

This makes the website visually polished without a huge CSS file.

---

### File 2: `app/components/digital-twin-chat.tsx`

This component is the interactive chat panel.

The structure is:

- left side: text and quick prompt buttons
- right side: chat conversation and input

The quick prompt buttons are created with an array:

```tsx
const starterPrompts = [
  "What is your background in software engineering?",
  "What kind of leadership roles have you held?",
  "What technologies are you strongest in?",
  "What is your career journey from 2014 to now?",
];
```

Then it is rendered like this:

```tsx
{starterPrompts.map((prompt) => (
  <button
    key={prompt}
    type="button"
    onClick={() => setInput(prompt)}
  >
    {prompt}
  </button>
))}
```

This is a very good beginner pattern because it shows how you can:

- store data in an array
- render it dynamically
- attach event handlers to each item

### The message state model
Chat history is represented as simple objects:

```tsx
type Message = {
  role: "assistant" | "user";
  content: string;
};
```

This is a very clean approach because each message has a role and some text.

Then the app updates the message array like this:

```tsx
setMessages((current) => [...current, nextUserMessage]);
```

This is an important React idea: never mutate an array directly if you are using state. Instead, create a new array and set it.

---

### File 3: `app/api/chat/route.ts`

This is the server-side route that connects the frontend to OpenRouter.

The route receives a request, validates input, calls an external API, and returns JSON.

Example response logic:

```ts
return NextResponse.json({ reply });
```

This is the server returning the AI response to the frontend.

The frontend then reads it in the client component:

```tsx
const data = await response.json();

if (!response.ok) {
  throw new Error(data?.error || "Unable to get a response.");
}
```

This is a standard pattern: fetch, check status, parse JSON, handle errors.

---

## 12. Beginner explanation of the data flow

Here is the complete flow in plain English:

1. The page loads with the portfolio information.
2. The user clicks a starter prompt or types a question.
3. The frontend sends that question to the server using `fetch()`.
4. The server reads the API key from `.env`.
5. The server sends that message to OpenRouter.
6.OpenRouter returns a response.
7. The server sends the response back to the browser.
8. The browser displays the AI answer in the chat UI.

This is the basic architecture of many modern web apps: frontend + server + external API.

---

## 13. A note on the current OpenRouter model behavior

This project intentionally uses the model:

```ts
model: "qwen/qwen3.8-27b:free"
```

However, during testing, the shared free model was rate-limited by the upstream provider. That means the API temporarily rejected requests.

The app handles this gracefully by falling back to a profile-based answer rather than crashing or showing an ugly raw provider error.

This is a nice example of production-minded thinking: you can design for failure as well as success.

---

## 14. What makes this project a good beginner project

This project is a good learning project because it combines a lot of real-world frontend concepts in one place:

- component-based UI
- data-driven rendering
- forms and user input
- API requests
- server routes
- environment variables
- external AI integration
- styling with utility classes

It is not just “a webpage.” It is a small but realistic application.

---

## 15. 5 self-review suggestions for improvement

Here are 5 honest suggestions for improving the code, based on review of the current implementation:

### 1. Add a proper chat message type for loading and error states
Right now the message model is simple, but as the app grows, it may be useful to add more fields like `id`, `timestamp`, or `status` to make the UI easier to manage and debug.

### 2. Extract the API call into a reusable helper
The current `fetch("/api/chat")` call is fine for a small app, but moving it into a utility function would make the code cleaner and easier to reuse across features.

### 3. Add stronger error handling and user messaging
The app currently handles edge cases, but a more polished UX would include clearer statuses such as:

- retrying
- rate-limited message
- AI unavailable
- disconnected state

### 4. Consider storing career data in a separate structured source
The profile content exists in multiple arrays and section definitions. Moving it into a single structured data object would make editing content easier and reduce duplication.

### 5. Add tests for the API route and chat UI
As this grows, automated tests would help ensure the app still works when changes are made. A simple test could check that the route rejects empty input or returns a valid response for a valid message.

---

## Final takeaway

This project is a strong example of how frontend and backend skills come together in a modern web application.

You used:

- React to build the interactive UI
- Next.js to structure the app and API layer
- Tailwind to create polished visual styling
- OpenRouter to bring AI into the portfolio
- environment variables to protect secrets

That is a realistic workflow for a modern full-stack frontend project.

If you are a beginner, the most important lesson is this:

A web app is not just one file. It is a system of connected pieces — data, components, user input, server logic, and external APIs — all working together.

That is the real power behind projects like this.
