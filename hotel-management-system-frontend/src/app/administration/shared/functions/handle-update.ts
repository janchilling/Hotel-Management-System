export function handleUpdate(contractId: number, resource: String, router: any) {
    router.navigate([`/administration/update/${contractId}`], { queryParams: { resource } });
}
