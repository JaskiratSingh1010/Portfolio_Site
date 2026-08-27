const live = '';
const services = {
  dev: { kicker: 'Systems, software & applied AI', heading: 'Four ways to make work <em>clearer and faster.</em>', items: [
    ['01','Presence & lead generation','Business Website Development','A focused, high-performance website designed to explain your value and turn the right visitors into enquiries.','business-websites'],
    ['02','Clarity & live reporting','Business Dashboards','One reliable operational view that turns scattered spreadsheets and business data into decisions.','business-dashboards'],
    ['03','Less repetition, more control','Workflow Automation','Reliable systems that replace repetitive handoffs, follow-ups and spreadsheet-heavy processes.','workflow-automation'],
    ['04','Applied AI, built responsibly','AI Tools for Business','Purpose-built AI assistants that research, process documents, prepare replies and support better decisions.','ai-business-tools'] ] },
  marketing: { kicker: 'Brand, content & growth', heading: 'Marketing that makes your value <em>easier to see.</em>', items: [
    ['01','Positioning & identity','Brand Strategy','Clarify your message, audience and competitive position before creating campaigns.','brand-strategy'],
    ['02','Consistent communication','Social Media Marketing','A practical content system designed to build recognition and useful engagement.','social-media-marketing'],
    ['03','Reach the right people','Performance Marketing','Focused digital campaigns shaped around measurable business outcomes.','performance-marketing'],
    ['04','Stories people remember','Content & Creative','Sharp creative direction and content that turns attention into interest.','content-creative'] ] }
};
const list = document.querySelector('#service-list');
function renderServices(mode) {
  const data = services[mode];
  document.querySelector('#service-kicker').textContent = data.kicker;
  document.querySelector('#service-heading').innerHTML = data.heading;
  list.innerHTML = data.items.map(([n,kicker,title,text,slug]) => `<a class="homeServiceRow" href="${live}/service/${slug}"><span class="homeServiceNumber">${n}</span><div><small>${kicker}</small><h3>${title}</h3></div><p>${text}</p><div class="homeServicePrice"><small>Explore</small><b>View service</b><i>↗</i></div></a>`).join('');
}
document.querySelectorAll('.serviceModeBar button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.serviceModeBar button').forEach(item => item.setAttribute('aria-selected', 'false'));
  button.setAttribute('aria-selected', 'true');
  renderServices(button.dataset.mode);
}));
renderServices('dev');

const aboutIntro = document.querySelector('[data-about-intro]');
if (aboutIntro) {
  const introObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      aboutIntro.play().catch(() => {});
    } else {
      aboutIntro.pause();
    }
  }, { threshold: 0.45 });
  introObserver.observe(aboutIntro);
}
