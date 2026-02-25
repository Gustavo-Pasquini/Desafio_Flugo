import { db } from './firestore';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const COLLAB_COLLECTION = "colaboradores";

export async function createColaboradoresCollection() {
  await getDocs(collection(db, COLLAB_COLLECTION));
}

export async function getColaboradores() {
  const snapshot = await getDocs(collection(db, COLLAB_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addColaborador(data: { nome: string; email: string; departamento: string; ativo: boolean, avatar: string }) {
  return await addDoc(collection(db, COLLAB_COLLECTION), {
    ...data,
    createdAt: new Date(),
  });
}
