"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/action/user";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OnboardingForm = ({ industries }) => {

    const [selectedIndustry, setSelectedIndustry] = useState(null);

    const router = useRouter();

    const {loading: updateLoading, fn: updateUserFn, data: updateResult} = useFetch(updateUser);

    const {register, handleSubmit, formState: { errors }, setValue, watch,}=  useForm({
        resolver: zodResolver(onboardingSchema),
    });

    const onSubmit = async (values) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
    }
  };

  useEffect(() => {
        if (updateResult?.success && !updateLoading) {
            toast.success("Profile completed successfully!");
            router.push("/dashboard");
            router.refresh();
        }
    }, [updateResult, updateLoading]);

    const watchIndustry = watch("industry");

    return (
        <div className="flex items-center justify-center bg-background">
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader>
                    <CardTitle className="title-gradient">Complete your profile</CardTitle>
                    <CardDescription>Select your industry to get personalized career insights and recommendations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <Label htmlFor="industry">Industry</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue("industry", value);
                                    setSelectedIndustry(
                                        industries.find((ind) => ind.id === value)
                                    );
                                    setValue("subIndustry", "");
                                }}
                            >
                                <SelectTrigger id="industry" className="w-full border-2 border-yellow-400 bg-transparent text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                    <SelectValue placeholder="select an industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    {industries.map((industry)=>{
                                        return (<SelectItem value={industry.id} key={industry.id}>{industry.name}</SelectItem>)
                                    })}
                                    
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.industry && (
                                <p className="text-sm text-red-500">
                                {errors.industry.message}
                                </p>
                            )}
                        </div>
                        {watchIndustry && (
                            <div className="space-y-4">
                                <Label htmlFor="subIndustry">Specializations</Label>
                                <Select onValueChange={(value) => setValue("subIndustry", value)}>
                                    <SelectTrigger id="subIndustry" className="w-full border-2 border-yellow-400 bg-transparent text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                        <SelectValue placeholder="select an industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {selectedIndustry?.subIndustries.map((sub) =>
                                            {return (<SelectItem key={sub} value={sub}>{sub}</SelectItem>);
                                        })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.subIndustry && (
                                    <p className="text-sm text-red-500">
                                    {errors.subIndustry.message}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="space-y-4 ">
                            <Label htmlFor="experience">Years of experience</Label>
                            <Input className="w-full border-2 border-yellow-400 bg-transparent text-white" id="experience" type="number" min="0" max="50" placeholder="Enter years of experience" {...register("experience")} />    
                            {errors.subIndustry && (
                                <p className="text-sm text-red-500">
                                    {errors.subIndustry.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="skills">Skills</Label>
                            <Input className="border-2 border-yellow-400 bg-transparent text-white" id="skills" placeholder="e.g., Python, JavaScript, Project Management" {...register("skills")}/>
                            <p className="text-sm text-muted-foreground">
                                Separate multiple skills with commas
                            </p>
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills.message}</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="bio">Professional Bio</Label>
                            <Textarea className="border-2 border-yellow-400 bg-transparent text-white h-32" id="bio" placeholder="Tell us about your professional background..." {...register("bio")}/>
                            {errors.bio && (
                                <p className="text-sm text-red-500">{errors.bio.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full bg-[radial-gradient(circle,_#FFD77A_0%,_#FFF8E7_40%,_#E6A520_80%,_#7A4A00_100%)]" disabled={updateLoading}>
                            {updateLoading ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                                </>
                            ) : (
                                "Complete Profile"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );

}

export default OnboardingForm;