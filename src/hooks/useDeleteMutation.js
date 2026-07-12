import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../lib/showToast";
import axios from "axios";

const useDeleteMutation = (queryKey, deleteEndPoint) => {
const queryClient = useQueryClient() //We gett all the query client by this
return useMutation({
    mutationFn: async({ids,deleteType})=> {
        const {data: response} = await axios({
            url: deleteEndPoint,
            method: deleteType === "PD" ? "DELETE" : "PUT",
            data: {ids, deleteType}
        })
        if(!response.success){
            throw new Error(response.message)
        }

        return response
    },
    onSuccess: (data) => {
        showToast("success", data.message)
        queryClient.invalidateQueries({queryKey: queryKey})
    },
    onError: (error) => {
        showToast("error", error.message)
    }
})
}

export default useDeleteMutation;