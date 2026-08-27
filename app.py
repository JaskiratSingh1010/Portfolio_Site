from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import HTTPException
from content import PROJECTS, SERVICES, WEBSITE_TEMPLATES

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(
    title="Jaskirat Singh Narang — Portfolio",
    description="AI automation, web applications, and data operations portfolio.",
)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


@app.get("/", response_class=HTMLResponse)
async def portfolio(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name="index.html", context={"website_templates": WEBSITE_TEMPLATES})

@app.get("/projects", response_class=HTMLResponse)
async def projects(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name="listing.html", context={"kind": "projects", "items": PROJECTS})

@app.get("/project/{slug}", response_class=HTMLResponse)
async def project_detail(request: Request, slug: str) -> HTMLResponse:
    item = next((x for x in PROJECTS if x["slug"] == slug), None)
    if not item: raise HTTPException(404)
    return templates.TemplateResponse(request=request, name="detail.html", context={"kind": "project", "item": item})

@app.get("/services", response_class=HTMLResponse)
async def services(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name="listing.html", context={"kind": "services", "items": SERVICES})

@app.get("/service/{slug}", response_class=HTMLResponse)
async def service_detail(request: Request, slug: str) -> HTMLResponse:
    item = next((x for x in SERVICES if x["slug"] == slug), None)
    if not item: raise HTTPException(404)
    return templates.TemplateResponse(request=request, name="detail.html", context={"kind": "service", "item": item})


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
