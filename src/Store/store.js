import create from "zustand";

const [useStore] = create((set) => ({
    userId:'',
    // data:[],
    updateId:(prop)=>{
        set(state => ({userId: prop}))},
    // updateData:(prop)=>{console.log(prop)
    //         set(state => ({data:prop.filter(item=>item)}))},
}));

export { useStore };
