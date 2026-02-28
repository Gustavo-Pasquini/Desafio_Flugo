import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firestore';

export const getDepartamentos = async () => {
  const snapshot = await getDocs(collection(db, 'departamentos'));
  return snapshot.docs.map(doc => ({ id: doc.id, colaboradores: [], ...doc.data() }));
};

export const addDepartamento = async (departamento: any) => {
  const docRef = await addDoc(collection(db, 'departamentos'), departamento);
  return docRef.id;
};

export const updateDepartamento = async (id: string, departamento: any) => {
  await updateDoc(doc(collection(db, 'departamentos'), id), departamento);
};

export const deleteDepartamento = async (id: string) => {
  await deleteDoc(doc(collection(db, 'departamentos'), id));
};
