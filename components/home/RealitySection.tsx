'use client';

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SplitText } from "@/components/ui/SplitText";
import { RealityIllustration } from "@/components/illustrations/SectionIllustrations";

export const RealitySection = () => {
  return (
    <section className="section-padding bg-white relative">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-teal/5 rounded-[2rem] blur-2xl group-hover:bg-brand-teal/10 transition-colors duration-500"></div>
              <div className="relative">
                <RealityIllustration />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="text-center lg:text-left order-1 lg:order-2">
            <SplitText
              text="The Reality"
              tag="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy mb-8"
              splitType="chars"
              delay={0.2}
              duration={0.5}
              stagger={0.04}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Most organisations don't wake up excited to "do cyber". They get pushed into it by vendor assessments, board pressure, insurer requirements, and privacy obligations.
            </p>
            <div className="mt-8 h-1.5 w-24 bg-brand-teal rounded-full mx-auto lg:mx-0"></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
