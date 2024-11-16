"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";
import { useUser } from "@clerk/nextjs";

interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent(props: PROPS) {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === props.params["template-slug"]
  );
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  /**
   * Generates content using AI and updates the state and database
   * @param formData - Data from the form
   */
  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      console.log("User needs to upgrade subscription.");
      router.push("/dashboard/billing");
      return;
    }

    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAIPrompt);

      console.log("AI raw response:", result);

      const aiContent = await result?.response.text();
      console.log("AI output content:", aiContent);

      setAiOutput(aiContent);

      await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, aiContent);

      // Update total usage
      const usageIncrement = aiContent.length; // Example usage based on length of response
      setTotalUsage((prev: number) => prev + usageIncrement);

      // Update credit usage timestamp
      setUpdateCreditUsage(Date.now());
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Saves generated content to the database
   * @param formData - Data submitted by the user
   * @param slug - Template slug
   * @param aiResp - AI-generated response
   */
  const SaveInDb = async (formData: string, slug: string | undefined, aiResp: string) => {
    const dataToSave = {
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress,
      createdAt: moment().format("DD/MM/yyyy"),
    };

    console.log("Data being saved to database:", dataToSave);

    try {
      const result = await db.insert(AIOutput).values(dataToSave);
      console.log("Database insert result:", result);
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* FormSection */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
