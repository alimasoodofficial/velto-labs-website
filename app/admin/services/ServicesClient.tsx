"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, Globe, FileText, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function ServicesClient() {
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setServices(data || []);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteService = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            const { error } = await supabase.from('services').delete().eq('id', id);
            if (error) throw error;

            toast.success("Service deleted");
            fetchServices();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Services Directory</h1>
                    <p className="text-slate-500 mt-1 font-medium">Manage and organize your environmental services.</p>
                </div>
                <Button asChild className="shrink-0 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-bold h-12 px-6">
                    <Link href={`/admin/services/new`}>
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Service
                    </Link>
                </Button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-[2.5rem] p-4 sm:p-8 shadow-2xl border-none">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No services found</h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">Start building your database by adding your first environmental service to the system.</p>
                        <Button asChild variant="outline" className="rounded-xl border-slate-200">
                            <Link href={`/admin/services/new`}>Create First Service</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-slate-50 p-6 rounded-3xl border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-6 relative overflow-hidden text-center sm:text-left sm:flex-row">

                                {/* Status Indicator */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm",
                                        service.is_published ? "bg-emerald-100 text-emerald-700" : "bg-zinc-200 text-zinc-600"
                                    )}>
                                        {service.is_published ? "Published" : "Draft"}
                                    </div>
                                </div>

                                <div className="w-24 h-24 rounded-2xl bg-white shadow-md overflow-hidden shrink-0 flex items-center justify-center p-2 relative">
                                    {service.image_url ? (
                                        <Image src={service.image_url} alt="Cover" fill className="object-cover rounded-xl" />
                                    ) : (
                                        <Globe className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start w-full">
                                    <h3 className="font-bold text-lg text-slate-900 truncate w-full mb-1">
                                        {service.title_en}
                                    </h3>
                                    <p className="text-sm text-slate-500 truncate w-full mb-3" dir="rtl">
                                        {service.title_ar}
                                    </p>

                                    <div className="flex items-center gap-2 mt-auto text-xs font-bold text-slate-400">
                                        <span className="flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                                            /{service.slug}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button asChild variant="outline" className="flex-1 sm:h-auto py-2 rounded-xl bg-white border-slate-200 hover:text-primary hover:border-primary/50 text-slate-600">
                                        <Link href={`/admin/services/${service.id}`}>
                                            <Edit2 className="w-4 h-4 sm:mr-0 mr-2" />
                                            <span className="sm:hidden">Edit</span>
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="flex-1 sm:h-auto py-2 rounded-xl bg-white border-slate-200 hover:text-red-600 hover:bg-red-50 text-slate-600 hover:border-red-200" onClick={() => deleteService(service.id)}>
                                        <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
                                        <span className="sm:hidden">Delete</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
