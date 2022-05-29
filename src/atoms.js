import { atom } from "recoil"

export const idState = atom({
    key: 'idState',
    default: 0,
});

export const departmentState = atom({
    key: 'departmentState',
    default: ["IT", "Vertrieb", "Buchhaltung", "Marketing"]
})

export const openState = atom({
    key: 'openState',
    default: false,
})