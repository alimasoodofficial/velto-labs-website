"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ServiceFormClient from "../ServiceFormClient";
import { Loader2 } from "lucide-react";

export default function EditServiceClient({ id }: { id: string }) {
    const [initialData, setInitialData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id === 'new') {
            setIsLoading(false);
            return;
        }

        const fetchService = async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();

            if (data) {
                setInitialData(data);
            }
            setIsLoading(false);
        };

        fetchService();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        );
    }

    return <ServiceFormClient isNew={id === 'new'} initialData={initialData} />;
}
