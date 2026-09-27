const WasteCategory = require('../models/WasteCategory');

// Default initial waste categories with rich structured disposal guidance
const initialCategories = [
  {
    name: 'E-Waste',
    description: 'Electronic devices, computers, phones, batteries, and appliances that should not be mixed with household trash.',
    disposalGuidance: 'Keep electronic devices and batteries separate from regular waste and use an appropriate e-waste collection channel.',
    disposalMethod: 'Separate e-waste items and request specialized collection or deposit at designated e-waste drop-off points.',
    dos: [
      'Keep lithium and household batteries separate.',
      'Protect devices from moisture and damage.',
      'Store electronics in a dry, safe container before pickup.',
    ],
    donts: [
      'Do not burn or incinerate electronics.',
      'Do not mix e-waste with wet or organic waste.',
      'Do not crush or dismantle hazardous components unnecessarily.',
    ],
    environmentalNote: 'Proper e-waste recycling recovers valuable precious metals (copper, gold, silver) and prevents toxic heavy metals (lead, mercury) from leaking into soil and water supplies.',
    safetyNote: 'Handle damaged batteries or swollen device cells with extreme care and store in a non-flammable container.',
    icon: 'bi-cpu-fill',
  },
  {
    name: 'Plastic',
    description: 'Plastic bottles, food packaging, jugs, and synthetic polymer containers.',
    disposalGuidance: 'Separate recyclable plastic from mixed waste where possible and keep it reasonably clean and dry.',
    disposalMethod: 'Rinse out liquids, flatten bulky bottles, and bundle clean rigid plastics together.',
    dos: [
      'Rinse out food and liquid residues before disposal.',
      'Compress plastic bottles to save space.',
      'Separate soft plastic film from hard plastic containers.',
    ],
    donts: [
      'Do not include heavily oil-stained plastic wraps.',
      'Do not mix non-recyclable multi-layer foil laminates.',
      'Do not burn plastic materials.',
    ],
    environmentalNote: 'Recycling plastics significantly reduces microplastic contamination in aquatic ecosystems and conserves fossil fuel resources.',
    safetyNote: 'Ensure sharp plastic edges or broken plastic containers are safely wrapped.',
    icon: 'bi-recycle',
  },
  {
    name: 'Paper',
    description: 'Cardboard boxes, newspapers, magazines, office paper, and paper packaging.',
    disposalGuidance: 'Keep paper dry and separate from wet or contaminated waste for easier recycling.',
    disposalMethod: 'Flatten cardboard boxes and stack clean paper flat in dry bundles.',
    dos: [
      'Keep paper products completely dry.',
      'Flatten all cardboard boxes prior to collection.',
      'Remove heavy plastic tape or binder clips where possible.',
    ],
    donts: [
      'Do not include food-greasy pizza boxes or wet paper.',
      'Do not mix wax-coated paper or thermal receipts.',
      'Do not dispose of tissue paper with recyclable paper.',
    ],
    environmentalNote: 'Recycling one ton of paper saves approximately 17 trees and 7,000 gallons of water.',
    safetyNote: 'Keep dry paper stacks away from open heat sources or electrical hazards.',
    icon: 'bi-file-earmark-text-fill',
  },
  {
    name: 'Glass',
    description: 'Glass bottles, food jars, beverage containers, and glassware.',
    disposalGuidance: 'Handle glass carefully and keep broken glass safely contained.',
    disposalMethod: 'Rinse out glass containers and place unbroken glass carefully in sturdy crates or boxes.',
    dos: [
      'Rinse glass jars and bottles clean.',
      'Keep metal caps and corks separate if applicable.',
      'Wrap broken glass securely in heavy paper or cardboard.',
    ],
    donts: [
      'Do not mix ceramic dishes, mirrors, or window glass with bottle glass.',
      'Do not leave loose broken glass in open plastic bags.',
      'Do not throw glass into mixed trash bins.',
    ],
    environmentalNote: 'Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity.',
    safetyNote: 'Always wear protective gloves when handling broken glass shards.',
    icon: 'bi-cup-straw',
  },
  {
    name: 'Organic',
    description: 'Food scraps, kitchen waste, garden clippings, and compostable organic matter.',
    disposalGuidance: 'Keep food and biodegradable waste separate from recyclable materials.',
    disposalMethod: 'Collect in vented compost bins or biodegradable bags for rapid composting or biogas processing.',
    dos: [
      'Separate vegetable peels, fruit waste, and coffee grounds.',
      'Keep garden clippings and leaves bundled.',
      'Use breathable or compostable bags.',
    ],
    donts: [
      'Do not mix plastic wrappers or metal ties in organic waste.',
      'Do not include diseased plants or treated timber.',
      'Do not allow organic waste to remain stagnant in heat.',
    ],
    environmentalNote: 'Composting organic waste diverts methane-producing material away from landfills and creates nutrient-rich soil.',
    safetyNote: 'Keep organic waste containers sealed to prevent pest attraction and foul odors.',
    icon: 'bi-flower2',
  },
  {
    name: 'Metal',
    description: 'Aluminum cans, tin food cans, scrap metal pieces, cookware, and metal fixtures.',
    disposalGuidance: 'Separate recyclable metal items from mixed waste where possible.',
    disposalMethod: 'Rinse out food cans, bundle scrap metal securely, and separate ferrous from non-ferrous metals.',
    dos: [
      'Rinse aluminum beverage cans and food tins.',
      'Tie or box loose scrap metal pieces together.',
      'Separate clean aluminum from steel or iron items.',
    ],
    donts: [
      'Do not include pressurized aerosol cans without depressurizing.',
      'Do not mix metal items with hazardous chemical residues.',
      'Do not leave sharp jagged metal exposed.',
    ],
    environmentalNote: 'Recycling aluminum requires 95% less energy than producing new aluminum from bauxite ore.',
    safetyNote: 'Watch out for sharp metal edges; tape sharp tin can lids inside the container.',
    icon: 'bi-box-seam-fill',
  },
  {
    name: 'Hazardous',
    description: 'Household chemicals, paints, motor oils, solvents, pesticides, and fluorescent tubes.',
    disposalGuidance: 'Keep hazardous materials separate from regular waste and request appropriate collection handling.',
    disposalMethod: 'Keep in original sealed containers with visible labels for specialized hazardous waste handling.',
    dos: [
      'Keep liquids in original tightly sealed containers.',
      'Store in a well-ventilated, dry area prior to pickup.',
      'Clearly label any unlabelled chemical containers.',
    ],
    donts: [
      'Do not pour chemicals or oils down household drains or soil.',
      'Do not mix different chemical substances together.',
      'Do not puncture pressurized paint or gas canisters.',
    ],
    environmentalNote: 'Proper hazardous waste containment prevents deadly chemical contamination of groundwater and soil ecosystems.',
    safetyNote: 'Wear gloves and eye protection when handling corrosive or toxic materials.',
    icon: 'bi-exclamation-triangle-fill',
  },
  {
    name: 'Other',
    description: 'Miscellaneous household items, composite materials, or bulky items not fitting standard categories.',
    disposalGuidance: 'Provide a short general responsible-disposal message.',
    disposalMethod: 'Package neatly and provide a brief item description for appropriate routing by collection teams.',
    dos: [
      'Disassemble large bulky items where possible.',
      'Describe item composition in the pickup request notes.',
      'Bundle loose mixed materials securely.',
    ],
    donts: [
      'Do not mix unknown chemical liquids with general bulky waste.',
      'Do not overload bags beyond weight capacity.',
    ],
    environmentalNote: 'Responsible waste segregation ensures maximum material recovery even for unconventional items.',
    safetyNote: 'Ensure heavy or bulky items are placed on ground level in accessible areas.',
    icon: 'bi-question-square-fill',
  },
];

// @desc    Get all waste categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    let categories = await WasteCategory.find().sort({ name: 1 });
    
    // Auto-seed or update categories if empty or missing structured fields
    if (categories.length === 0) {
      categories = await WasteCategory.insertMany(initialCategories);
    } else {
      // Ensure existing category documents have new structured fields
      let needsUpdate = false;
      for (const catObj of initialCategories) {
        const existing = categories.find((c) => c.name === catObj.name);
        if (existing && (!existing.disposalMethod || existing.dos.length === 0)) {
          existing.disposalMethod = catObj.disposalMethod;
          existing.dos = catObj.dos;
          existing.donts = catObj.donts;
          existing.environmentalNote = catObj.environmentalNote;
          existing.safetyNote = catObj.safetyNote;
          await existing.save();
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        categories = await WasteCategory.find().sort({ name: 1 });
      }
    }

    res.json(categories);
  } catch (error) {
    console.error('getCategories error:', error);
    res.status(500).json({ message: 'Error fetching waste categories', error: error.message });
  }
};

module.exports = {
  getCategories,
  initialCategories,
};
