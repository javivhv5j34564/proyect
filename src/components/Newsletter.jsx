import { motion } from 'framer-motion';

export function Newsletter() {
    return (
        <motion.section
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 w-full"
        >
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-500 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 md:mb-4">Don't fall behind in the AI era</h2>
              <p className="text-slate-300 mb-6 md:mb-8 text-base md:text-lg">
                Join over 10,000 professionals. Receive a weekly recap with 3 new artificial intelligence tools that will save you hours of work.
              </p>
              
              <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-20">
                  <input type="hidden" name="_next" value={window.location.href} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="Nueva suscripción a la newsletter" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your best email..."
                    className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium"
                    required
                  />
                  <button type="submit" className="px-6 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent-500/30 whitespace-nowrap active:scale-95 flex items-center justify-center">
                    Subscribe
                  </button>
              </form>
              <p className="text-xs text-slate-400 mt-4">Zero spam. You can unsubscribe anytime.</p>
            </div>
          </div>
        </motion.section>
    );
}
