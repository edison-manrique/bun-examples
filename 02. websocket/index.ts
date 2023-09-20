const server = Bun.serve<{ username: string }>({
    fetch(req, server) {
      const url = new URL(req.url);
      if (url.pathname === "/chat" && req.method === "GET") {
        console.log(`upgrade!`);

        const username = url.searchParams.get("user");
        const success = server.upgrade(req, { data: { username } });
        return success
          ? undefined
          : new Response("WebSocket upgrade error", { status: 400 });
      }
  
      return new Response("Hello world");
    },
    websocket: {
      open(ws) {
        const msg = `${ws.data.username} has entered the chat`;
        ws.subscribe("global-chat");
        ws.publish("global-chat", msg);
      },
      message(ws, message) {
        // this is a group chat
        // so the server re-broadcasts incoming message to everyone
        ws.publish("global-chat", `${ws.data.username}: ${message}`);
      },
      close(ws) {
        const msg = `${ws.data.username} has left the chat`;
        ws.unsubscribe("global-chat");
        ws.publish("global-chat", msg);
      },
    },
  });
  
  console.log(`Listening on ${server.hostname}:${server.port}`);
  