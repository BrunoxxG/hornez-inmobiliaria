"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import type { Toast as ToastType } from "primereact/toast";
import { createManagedUser, deleteManagedUser, resetManagedUserPassword, updateManagedUser } from "../actions/actionsUsers";

type ManagedUser = { id: string; name: string; email: string; role: "BASIC" | "ADMIN" | "SUPERADMIN"; createdAt: Date };

export default function UsersList({ users, currentRole }: { users: ManagedUser[]; currentRole: string }) {
  const [items, setItems] = useState(users);
  const [showCreate, setShowCreate] = useState(false);
  const [resetUser, setResetUser] = useState<ManagedUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<ManagedUser | null>(null);
  const [editUser, setEditUser] = useState<ManagedUser | null>(null);
  const [editField, setEditField] = useState<"name" | "email" | "role">("name");
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "BASIC" as "BASIC" | "ADMIN" });
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "BASIC" as "BASIC" | "ADMIN" });
  const [newPassword, setNewPassword] = useState("");
  const toast = useRef<ToastType | null>(null);

  const showError = (error?: string) => toast.current?.show({ severity: "error", summary: "Error", detail: error, life: 3000 });

  const handleCreate = async () => {
    const result = await createManagedUser(form);
    if (!result.success) return showError(result.error);
    setShowCreate(false);
    setForm({ name: "", email: "", password: "", role: "BASIC" });
    toast.current?.show({ severity: "success", summary: "Creado", detail: "Usuario creado", life: 3000 });
    window.location.reload();
  };

  const handleReset = async () => {
    if (!resetUser) return;
    const result = await resetManagedUserPassword(resetUser.id, newPassword);
    if (!result.success) return showError(result.error);
    setResetUser(null);
    setNewPassword("");
    toast.current?.show({ severity: "success", summary: "Actualizada", detail: "Contraseña reseteada", life: 3000 });
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    const result = await deleteManagedUser(deleteUser.id);
    if (!result.success) return showError(result.error);
    setItems((current) => current.filter((item) => item.id !== deleteUser.id));
    setDeleteUser(null);
    toast.current?.show({ severity: "success", summary: "Eliminado", detail: "Usuario eliminado", life: 3000 });
  };

  const handleEdit = async () => {
    if (!editUser) return;
    const result = await updateManagedUser(editUser.id, editForm);
    if (!result.success) return showError(result.error);

    setItems((current) => current.map((item) => (item.id === editUser.id ? { ...item, ...editForm } : item)));
    setEditUser(null);
    toast.current?.show({ severity: "success", summary: "Actualizado", detail: "Usuario actualizado", life: 3000 });
  };

  return (
    <div className="space-y-4">
      <Toast ref={toast} />
      <div className="flex justify-end">
        <Button label="Nuevo usuario" icon="pi pi-user-plus" onClick={() => setShowCreate(true)} />
      </div>
      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600"><tr><th className="p-4">Nombre</th><th className="p-4">Email</th><th className="p-4">Rol</th><th className="p-4 text-center">Acciones</th></tr></thead>
          <tbody>
            {items.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="whitespace-nowrap p-4 font-semibold">
                  <div className="inline-flex items-center gap-1 align-middle leading-none">
                    <span className="inline-block align-middle">{user.name}</span>
                    {currentRole === "SUPERADMIN" && user.role !== "SUPERADMIN" && (
                      <Button
                        icon="pi pi-pencil"
                        className="p-button-text"
                        style={{ color: "#EF7D00" }}
                        tooltip="Editar usuario"
                        tooltipOptions={{ position: "top" }}
                        aria-label={`Editar usuario ${user.name}`}
                        onClick={() => {
                          setEditUser(user);
                          setEditField("name");
                          setEditForm({ name: user.name, email: user.email, role: user.role === "ADMIN" ? "ADMIN" : "BASIC" });
                        }}
                      />
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap p-4">
                  <div className="inline-flex items-center gap-1">
                    <span>{user.email}</span>
                    {currentRole === "SUPERADMIN" && user.role !== "SUPERADMIN" && (
                      <Button icon="pi pi-pencil" className="p-button-text" style={{ color: "#EF7D00" }} tooltip="Editar email" tooltipOptions={{ position: "top" }} aria-label={`Editar email de ${user.name}`} onClick={() => { setEditUser(user); setEditField("email"); setEditForm({ name: user.name, email: user.email, role: user.role === "ADMIN" ? "ADMIN" : "BASIC" }); }} />
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap p-4">
                  <div className="inline-flex items-center gap-1">
                    <span>{user.role === "BASIC" ? "Básico" : user.role === "ADMIN" ? "Administrador" : "Superadmin"}</span>
                    {currentRole === "SUPERADMIN" && user.role !== "SUPERADMIN" && (
                      <Button
                        icon="pi pi-pencil"
                        className="p-button-text"
                        style={{ color: "#EF7D00" }}
                        tooltip="Editar rol"
                        tooltipOptions={{ position: "top" }}
                        aria-label={`Editar rol de ${user.name}`}
                        onClick={() => {
                          setEditUser(user);
                          setEditField("role");
                          setEditForm({ name: user.name, email: user.email, role: user.role === "ADMIN" ? "ADMIN" : "BASIC" });
                        }}
                      />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <Button label="Resetear contraseña" icon="pi pi-key" size="small" outlined onClick={() => setResetUser(user)} />
                  {user.role !== "SUPERADMIN" && (currentRole === "SUPERADMIN" || user.role === "BASIC") && (
                    <Button
                      icon="pi pi-trash"
                      size="small"
                      severity="danger"
                      text
                      style={{ fontSize: "1.1em" }}
                      tooltip="Eliminar usuario"
                      tooltipOptions={{ position: "top" }}
                      aria-label={`Eliminar usuario ${user.name}`}
                      onClick={() => setDeleteUser(user)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog visible={showCreate} onHide={() => setShowCreate(false)} header="Nuevo usuario" modal style={{ width: "min(90vw, 32rem)" }}>
        <div className="space-y-3">
          <InputText placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full" />
          <InputText placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full" />
          <Password placeholder="Contraseña inicial" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} feedback={false} toggleMask className="w-full" inputClassName="w-full" />
          {currentRole === "SUPERADMIN" && <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "BASIC" | "ADMIN" })} className="w-full rounded border p-2"><option value="BASIC">Básico</option><option value="ADMIN">Administrador</option></select>}
          <div className="flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setShowCreate(false)} /><Button label="Crear" onClick={() => void handleCreate()} /></div>
        </div>
      </Dialog>
      <Dialog visible={editUser !== null} onHide={() => setEditUser(null)} header={editField === "name" ? "Editar nombre" : editField === "email" ? "Editar email" : "Editar rol"} modal style={{ width: "min(90vw, 32rem)" }}>
        <div className="space-y-3">
          {editField === "name" ? (
            <InputText placeholder="Nombre" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full" />
          ) : editField === "email" ? (
            <InputText placeholder="Email" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full" />
          ) : (
            <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value as "BASIC" | "ADMIN" })} className="w-full rounded border p-2">
              <option value="BASIC">Básico</option>
              <option value="ADMIN">Administrador</option>
            </select>
          )}
          <div className="flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setEditUser(null)} /><Button label="Guardar" className="dashboard-action-button" onClick={() => void handleEdit()} /></div>
        </div>
      </Dialog>
      <Dialog visible={resetUser !== null} onHide={() => setResetUser(null)} header="Resetear contraseña" modal style={{ width: "min(90vw, 28rem)" }}>
        <p className="mb-3">Nueva contraseña para <strong>{resetUser?.name}</strong></p>
        <Password placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} feedback={false} toggleMask className="w-full" inputClassName="w-full" />
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setResetUser(null)} /><Button label="Guardar" onClick={() => void handleReset()} /></div>
      </Dialog>
      <Dialog visible={deleteUser !== null} onHide={() => setDeleteUser(null)} header="Confirmar eliminación" modal style={{ width: "min(90vw, 28rem)" }}>
        <p>¿Eliminar al usuario <strong>{deleteUser?.name}</strong>?</p>
        <div className="mt-4 flex justify-end gap-2"><Button label="Cancelar" severity="secondary" outlined onClick={() => setDeleteUser(null)} /><Button label="Eliminar" severity="danger" onClick={() => void handleDelete()} /></div>
      </Dialog>
    </div>
  );
}
