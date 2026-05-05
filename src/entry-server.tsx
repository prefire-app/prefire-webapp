import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./app/App";

export function render(url: string): { html: string } {
    const html = renderToString(
        <StaticRouter location={url}>
            <App />
        </StaticRouter>
    );
    return { html };
}
