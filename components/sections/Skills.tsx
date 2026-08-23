import { skillCategories } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="px-5 sm:px-8 section-rule">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-10">
          <h2 className="font-display font-semibold text-2xl sm:text-3xl">
            Technical Skills
          </h2>
          <span className="rule-draw" aria-hidden="true" />
        </Reveal>

        <Reveal className="space-y-8">
          {skillCategories.map((cat) => (
            <div
              key={cat.name}
              className="row-hover grid sm:grid-cols-12 gap-2 sm:gap-6 border-t border-border py-5"
            >
              <h3 className="mono-label text-foreground sm:col-span-3">
                {cat.name}
              </h3>
              <div className="chip-row sm:col-span-9 text-lg leading-relaxed">
                {cat.skills.map((skill) => (
                  <span key={skill} className="chip-dot">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Also proficient in */}
        <p className="text-muted-foreground text-sm mt-10 leading-relaxed max-w-2xl">
          <span className="text-primary font-medium">Also proficient in:</span>{" "}
          Jupyter Notebooks, Kaggle, Google Colab, PowerShell, Bash, YAML,
          pytest, Pandas, NumPy, Scikit-learn, and more.
        </p>
      </div>
    </section>
  );
}
