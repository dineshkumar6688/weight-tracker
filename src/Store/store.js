import create from "zustand";

const [useStore] = create((set) => ({
    userId:'',
    updateId:(prop)=>{
        set(state => ({userId: prop}))},
}));

export { useStore };
