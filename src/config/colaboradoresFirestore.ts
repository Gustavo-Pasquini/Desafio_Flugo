import { db } from './firestore';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getDepartamentos, updateDepartamento } from './departamentosFirestore';

const COLLAB_COLLECTION = "colaboradores";

export async function createColaboradoresCollection() {
  await getDocs(collection(db, COLLAB_COLLECTION));
}

export async function getColaboradores() {
  const snapshot = await getDocs(collection(db, COLLAB_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addColaborador(data: { nome: string; email: string; departamento: string; ativo: boolean,  avatar: string, cargo: string, dataAdmissao: string, nivel: string, gestor: string, salario: string }) {
  return await addDoc(collection(db, COLLAB_COLLECTION), {
    ...data,
    createdAt: new Date(),
  });
}

export async function updateColaborador(id: string, data: Partial<{ nome: string; email: string; departamento: string; ativo: boolean; avatar: string; cargo: string; dataAdmissao: string; nivel: string; gestor: string; salario: string }>) {
  const ref = doc(db, COLLAB_COLLECTION, id);
  await updateDoc(ref, data);
}

export async function deleteColaborador(id: string) {
  // Remover colaborador do departamento
  const departamentos = await getDepartamentos();
  const dep = departamentos.find((d: any) => Array.isArray(d.colaboradores) && d.colaboradores.includes(id));
  if (dep && Array.isArray(dep.colaboradores)) {
    await updateDepartamento(dep.id, {
      ...dep,
      colaboradores: dep.colaboradores.filter((cid: string) => cid !== id)
    });
  }
  const ref = doc(db, COLLAB_COLLECTION, id);
  await deleteDoc(ref);
}
