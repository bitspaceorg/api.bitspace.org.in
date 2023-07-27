import { Router } from "express"

export type Module = {
    router: Router,
    BASE_ROUTE: string
}
